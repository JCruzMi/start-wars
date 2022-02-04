import { Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import React, { useState } from 'react';

import Link from 'next/link';

const styleButton = { borderRadius: 4}

export default function ButtonInfo({ characterId, showDrawer, name, getCharacter }) {
  const { size } = "large";
  
  return (
    <>

        
        <Link
          
          href={`/?currencyCode=${characterId}`}
          as={`/currency/${characterId}`}
        ><Button 
          type="primary" 
          icon={<PlusSquareOutlined />} 
          size={size} 
          style={styleButton}
          onClick={() => {showDrawer(name); getCharacter(characterId)}}
        >
        
          Details
        </Button></Link>
      
    </>
  );
}
