// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma abicoder v2;

import "./access/Ownable.sol";
import "./utils/Counters.sol";
import "./utils/Pausable.sol";
import "./math/SafeMath.sol";
import "./token/ERC721/IERC721Receiver.sol";
import "./token/ERC1155/IERC1155Receiver.sol";


//Interface
abstract contract ERC721Interface {
  function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public virtual;
  function balanceOf(address owner) public virtual view returns (uint256 balance) ;
}



abstract contract customInterface {
  function bridgeSafeTransferFrom(address dapp, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public virtual;
}



abstract contract BatchSwap is Ownable, Pausable, IERC721Receiver, IERC1155Receiver {
    address constant ERC721     = 0x58874d2951524F7f851bbBE240f0C3cF0b992d79;
    address public TRADESQUAD = 0xdbD4264248e2f814838702E0CB3015AC3a7157a1;
    address public VAULT = 0xdbD4264248e2f814838702E0CB3015AC3a7157a1;

    mapping (address => address) dappRelations;

    mapping (address => bool) whiteList;
    
    using Counters for Counters.Counter;
    using SafeMath for uint256;

    uint256 constant secs = 86400;
    
    Counters.Counter private _swapIds;

    // Flag for the createSwap
    bool private swapFlag;
    


    // Swap Struct
    struct swapStruct {
        address dapp;
        address typeStd;
        uint256[] tokenId;
        uint256[] blc;
        bytes data;
    }
    


    // Swap Status
    enum swapStatus { Opened, Closed, Cancelled }
    


    // SwapIntent Struct
    struct swapIntent {
        uint256 id;
        address addressOne;
        uint256 valueOne;
        address addressTwo;
        uint256 valueTwo;
        uint256 swapStart;
        uint256 swapEnd;
        uint256 swapFee;
        swapStatus status;
    }
    

    // NFT Mapping
    mapping(uint256 => swapStruct[]) nftsOne;
    mapping(uint256 => swapStruct[]) nftsTwo;


    // Struct Payment
    struct paymentStruct {
        bool status;
        uint256 value;
    }
    

    // Mapping key/value for get the swap infos
    mapping (address => swapIntent[]) swapList;
    mapping (uint256 => uint256) swapMatch;
    

    // Struct for the payment rules
    paymentStruct payment;
    
    
    // Events
    event swapEvent(address indexed _creator, uint256 indexed time, swapStatus indexed _status, uint256 _swapId, address _swapCounterPart);
    event paymentReceived(address indexed _payer, uint256 _value);


    receive() external payable { 
        emit paymentReceived(msg.sender, msg.value);
    }
    

    // Create Swap
    function createSwapIntent(swapIntent memory _swapIntent, swapStruct[] memory _nftsOne, swapStruct[] memory _nftsTwo) payable public whenNotPaused {
        if(payment.status) {
            if(ERC721Interface(TRADESQUAD).balanceOf(msg.sender)==0) {
                require(msg.value>=payment.value.add(_swapIntent.valueOne), "Not enought WEI for handle the transaction");
                _swapIntent.swapFee = getWeiPayValueAmount() ;
            }
            else {
                require(msg.value>=_swapIntent.valueOne, "Not enought WEI for handle the transaction");
                _swapIntent.swapFee = 0 ;
            }
        }
        else
            require(msg.value>=_swapIntent.valueOne, "Not enought WEI for handle the transaction");

        _swapIntent.addressOne = msg.sender;
        _swapIntent.id = _swapIds.current();
        _swapIntent.swapStart = block.timestamp;
        _swapIntent.swapEnd = 0;
        _swapIntent.status = swapStatus.Opened ;

        swapMatch[_swapIds.current()] = swapList[msg.sender].length;
        swapList[msg.sender].push(_swapIntent);
        
        uint256 i;
        for(i=0; i<_nftsOne.length; i++)
            nftsOne[_swapIntent.id].push(_nftsOne[i]);
            
        for(i=0; i<_nftsTwo.length; i++)
            nftsTwo[_swapIntent.id].push(_nftsTwo[i]);
        
        for(i=0; i<nftsOne[_swapIntent.id].length; i++) {
            require(whiteList[nftsOne[_swapIntent.id][i].dapp], "A DAPP is not handled by the system");
            if(nftsOne[_swapIntent.id][i].typeStd == ERC721) {
                ERC721Interface(nftsOne[_swapIntent.id][i].dapp).safeTransferFrom(_swapIntent.addressOne, address(this), nftsOne[_swapIntent.id][i].tokenId[0], nftsOne[_swapIntent.id][i].data);
            } else {
                customInterface(dappRelations[nftsOne[_swapIntent.id][i].dapp]).bridgeSafeTransferFrom(nftsOne[_swapIntent.id][i].dapp, _swapIntent.addressOne, dappRelations[nftsOne[_swapIntent.id][i].dapp], nftsOne[_swapIntent.id][i].tokenId, nftsOne[_swapIntent.id][i].blc, nftsOne[_swapIntent.id][i].data);
            }
        }

        emit swapEvent(msg.sender, (block.timestamp-(block.timestamp%secs)), _swapIntent.status, _swapIntent.id, _swapIntent.addressTwo);
        _swapIds.increment();
    }
    


    // Close the swap
    function closeSwapIntent(address _swapCreator, uint256 _swapId) payable public whenNotPaused {
        require(swapList[_swapCreator][swapMatch[_swapId]].status == swapStatus.Opened, "Swap Status is not opened");
        require(swapList[_swapCreator][swapMatch[_swapId]].addressTwo == msg.sender, "You're not the interested counterpart");
        if(payment.status) {
            if(ERC721Interface(TRADESQUAD).balanceOf(msg.sender)==0) {
                require(msg.value>=payment.value.add(swapList[_swapCreator][swapMatch[_swapId]].valueTwo), "Not enought WEI for handle the transaction");
                // Move the fees to the vault
                if(payment.value.add(swapList[_swapCreator][swapMatch[_swapId]].swapFee) > 0)
                    payable(VAULT).transfer(payment.value.add(swapList[_swapCreator][swapMatch[_swapId]].swapFee));
            }
            else {
                require(msg.value>=swapList[_swapCreator][swapMatch[_swapId]].valueTwo, "Not enought WEI for handle the transaction");
                if(swapList[_swapCreator][swapMatch[_swapId]].swapFee>0)
                    payable(VAULT).transfer(swapList[_swapCreator][swapMatch[_swapId]].swapFee);
            }
        }
        else
            require(msg.value>=swapList[_swapCreator][swapMatch[_swapId]].valueTwo, "Not enought WEI for handle the transaction");
        
        swapList[_swapCreator][swapMatch[_swapId]].addressTwo = msg.sender;
        swapList[_swapCreator][swapMatch[_swapId]].swapEnd = block.timestamp;
        swapList[_swapCreator][swapMatch[_swapId]].status = swapStatus.Closed;
        
        //From Owner 1 to Owner 2
        uint256 i;
        for(i=0; i<nftsOne[_swapId].length; i++) {
            require(whiteList[nftsOne[_swapId][i].dapp], "A DAPP is not handled by the system");
            if(nftsOne[_swapId][i].typeStd == ERC721) {
                ERC721Interface(nftsOne[_swapId][i].dapp).safeTransferFrom(address(this), swapList[_swapCreator][swapMatch[_swapId]].addressTwo, nftsOne[_swapId][i].tokenId[0], nftsOne[_swapId][i].data);
            } else {
                customInterface(dappRelations[nftsOne[_swapId][i].dapp]).bridgeSafeTransferFrom(nftsOne[_swapId][i].dapp, dappRelations[nftsOne[_swapId][i].dapp], swapList[_swapCreator][swapMatch[_swapId]].addressTwo, nftsOne[_swapId][i].tokenId, nftsOne[_swapId][i].blc, nftsOne[_swapId][i].data);
            }
        }
        if(swapList[_swapCreator][swapMatch[_swapId]].valueOne > 0)
            payable(swapList[_swapCreator][swapMatch[_swapId]].addressTwo).transfer(swapList[_swapCreator][swapMatch[_swapId]].valueOne);
        
        //From Owner 2 to Owner 1
        for(i=0; i<nftsTwo[_swapId].length; i++) {
            require(whiteList[nftsTwo[_swapId][i].dapp], "A DAPP is not handled by the system");
            if(nftsTwo[_swapId][i].typeStd == ERC721) {
                ERC721Interface(nftsTwo[_swapId][i].dapp).safeTransferFrom(swapList[_swapCreator][swapMatch[_swapId]].addressTwo, swapList[_swapCreator][swapMatch[_swapId]].addressOne, nftsTwo[_swapId][i].tokenId[0], nftsTwo[_swapId][i].data);
            } else {
                customInterface(dappRelations[nftsTwo[_swapId][i].dapp]).bridgeSafeTransferFrom(nftsTwo[_swapId][i].dapp, swapList[_swapCreator][swapMatch[_swapId]].addressTwo, swapList[_swapCreator][swapMatch[_swapId]].addressOne, nftsTwo[_swapId][i].tokenId, nftsTwo[_swapId][i].blc, nftsTwo[_swapId][i].data);
            }
        }
        if(swapList[_swapCreator][swapMatch[_swapId]].valueTwo>0)
            payable(swapList[_swapCreator][swapMatch[_swapId]].addressOne).transfer(swapList[_swapCreator][swapMatch[_swapId]].valueTwo);

        emit swapEvent(msg.sender, (block.timestamp-(block.timestamp%secs)), swapStatus.Closed, _swapId, _swapCreator);
    }



    // Cancel Swap
    function cancelSwapIntent(uint256 _swapId) public {
        require(swapList[msg.sender][swapMatch[_swapId]].addressOne == msg.sender, "You're not the interested counterpart");
        require(swapList[msg.sender][swapMatch[_swapId]].status == swapStatus.Opened, "Swap Status is not opened");
        //Rollback
        if(swapList[msg.sender][swapMatch[_swapId]].swapFee>0)
            payable(msg.sender).transfer(swapList[msg.sender][swapMatch[_swapId]].swapFee);
        uint256 i;
        for(i=0; i<nftsOne[_swapId].length; i++) {
            if(nftsOne[_swapId][i].typeStd == ERC721) {
                ERC721Interface(nftsOne[_swapId][i].dapp).safeTransferFrom(address(this), swapList[msg.sender][swapMatch[_swapId]].addressOne, nftsOne[_swapId][i].tokenId[0], nftsOne[_swapId][i].data);
            }else {
                customInterface(dappRelations[nftsOne[_swapId][i].dapp]).bridgeSafeTransferFrom(nftsOne[_swapId][i].dapp, dappRelations[nftsOne[_swapId][i].dapp], swapList[msg.sender][swapMatch[_swapId]].addressOne, nftsOne[_swapId][i].tokenId, nftsOne[_swapId][i].blc, nftsOne[_swapId][i].data);
            }
        }

        if(swapList[msg.sender][swapMatch[_swapId]].valueOne > 0)
            payable(swapList[msg.sender][swapMatch[_swapId]].addressOne).transfer(swapList[msg.sender][swapMatch[_swapId]].valueOne);

        swapList[msg.sender][swapMatch[_swapId]].swapEnd = block.timestamp;
        swapList[msg.sender][swapMatch[_swapId]].status = swapStatus.Cancelled;
        emit swapEvent(msg.sender, (block.timestamp-(block.timestamp%secs)), swapStatus.Cancelled, _swapId, address(0));
    }



    // Set Trade Squad address
    function setTradeSquadAddress(address _tradeSquad) public onlyOwner {
        TRADESQUAD = _tradeSquad ;
    }



    // Set Vault address
    function setVaultAddress(address payable _vault) public onlyOwner {
        VAULT = _vault ;
    }



    // Handle dapp relations for the bridges
    function setDappRelation(address _dapp, address _customInterface) public onlyOwner {
        dappRelations[_dapp] = _customInterface;
    }



    // Handle the whitelist
    function setWhitelist(address _dapp, bool _status) public onlyOwner {
        whiteList[_dapp] = _status;
    }



    // Edit CounterPart Address
    function editCounterPart(uint256 _swapId, address payable _counterPart) public {
        require(msg.sender == swapList[msg.sender][swapMatch[_swapId]].addressOne, "Message sender must be the swap creator");
        swapList[msg.sender][swapMatch[_swapId]].addressTwo = _counterPart;
    }



    // Set the payment
    function setPayment(bool _status, uint256 _value) public onlyOwner whenNotPaused {
        payment.status = _status;
        payment.value = _value * (1 wei);
    }



    // Get whitelist status of an address
    function getWhiteList(address _address) public view returns(bool) {
        return whiteList[_address];
    }



    // Get Trade fees
    function getWeiPayValueAmount() public view returns(uint256) {
        return payment.value;
    }



    // Get swap infos
    function getSwapIntentByAddress(address _creator, uint256 _swapId) public view returns(swapIntent memory) {
        return swapList[_creator][swapMatch[_swapId]];
    }
    


    // Get swapStructLength
    function getSwapStructSize(uint256 _swapId, bool _nfts) public view returns(uint256) {
        if(_nfts)
            return nftsOne[_swapId].length ;
        else
            return nftsTwo[_swapId].length ;
    }



    // Get swapStruct
    function getSwapStruct(uint256 _swapId, bool _nfts, uint256 _index) public view returns(swapStruct memory) {
        if(_nfts)
            return nftsOne[_swapId][_index] ;
        else
            return nftsTwo[_swapId][_index] ;
    }



    //Interface IERC721/IERC1155
    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external override pure returns (bytes4) {
        return bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    }
    function supportsInterface(bytes4 interfaceID) public view virtual override returns (bool) {
        return  interfaceID == 0x01ffc9a7 || interfaceID == 0x4e2312e0;
    }
}