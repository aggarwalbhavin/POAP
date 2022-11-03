// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract DeleteElement{
    uint[] public Array=[10,20,30,40];

   function remove(uint index) external{
       for (uint i = index; i < Array.length -1; i++){
           Array[i]= Array[i +1];
       }
       Array.pop();
    }
}