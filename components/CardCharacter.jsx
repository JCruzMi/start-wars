import { Card, Avatar } from 'antd';
const { Meta } = Card;
import styles from '../styles/CardCharacter.module.css'

import Link from 'next/link';

const styleMeta = {wordWrap: 'break-word', fontSize: 15 }

import ButtonInfo from './ButtonInfo.jsx'
export default function CardCharacter({character, showDrawer, getCharacter }) {
  return (
    <>
      <Card className={styles.card}
        hoverable
        title= {character.name}
      >
        <Meta 
          style={styleMeta}
          description={character.gender}
         />
        <div className={styles.flex}>
          <span>weight: {character.mass}</span>
          <span>height: {character.height}</span>
        </div>
        <br/>
        <ButtonInfo characterId={character.id} showDrawer={showDrawer} name={character.name} getCharacter={getCharacter} /> 

      </Card>
    </>
  )
}
