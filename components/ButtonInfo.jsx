import { Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import React, { useState } from 'react';

import Link from 'next/link';

const styleButton = { borderRadius: 4}

export default function ButtonInfo({ characterId, getCharacter }) {
  const { size } = "large";
  
  return (
    <>

        
        <Link
          
          href={`?=${characterId}`}
          as={`/${characterId}`}
        ><Button 
          type="primary" 
          icon={<PlusSquareOutlined />} 
          size={size} 
          style={styleButton}
          onClick={() => {getCharacter(characterId)}}
        >
        
          Details
        </Button></Link>
      
    </>
  );
}
