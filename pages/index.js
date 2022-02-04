import { useRouter } from "next/router";
import Link from "next/link";
/* ==== antd ==== */
import { Row, Col, Divider } from "antd";
import { Drawer } from "antd";

const style = { display: "flex", justifyContent: "center" };
/* ==== Apollo ==== */

import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";

import Layout from "../components/layout";
import Tags from "../components/Tags";
import CardCharacter from "../components/CardCharacter.jsx";

import { useState } from "react";


const styleDivider = {
  color: "#FFF",
  fontSize: "24",
  fontWeight: "bold",
  marginBottom: "2rem",
}
const DrawerStyle = {
  backgroundColor: "#E5E5E5"
}

export default function Home(results) {

  const initialState = results;
  const [characters, setGenerals] = useState(initialState.characters);
  const [visible, setVisible] = useState(false)
  const [charName, setCharName] = useState("")
  const [general, setGeneral] = useState([])
  const [films, setFilms] = useState([])
  const [planets, setPlanets] = useState([])



  const router = useRouter();

  const showDrawer = (name) => {
    setVisible(true)
    setCharName(name)
  };

  const onClose = () => {
    setVisible(false);
    router.push("/")
    setGeneral([])
  };

  const getCharacter = async (currencyCode) => {
    
    if (currencyCode !== undefined) {
      const results = await fetch("api/SearchCharacter", {
        method: "post",
        body: currencyCode
      })
      const {general, error} = await results.json()

      setGeneral(general)

      const filmsL = await fetch("api/SearchMovies", {
        method: "post",
        body: currencyCode
      })
      const {films} = await filmsL.json()

      setFilms(films)

      const planetsL = await fetch("api/SearchPlanets", {
        method: "post",
        body: currencyCode
      })
      const {planets} = await planetsL.json()
      
      setPlanets(planets)

    }else{
      console.log("no hay code")
    }
  }


  return (
    <>
      <Layout title="Star Wars | Characters">
        <Divider orientation="left" style={styleDivider}>Characters</Divider>
        <Row gutter={[30, 30]}>
          {characters.map((character) => (
            <Col
              key={character.node.id}
              className="gutter-row"
              xs={24}
              sm={12}
              md={12}
              lg={6}
              style={style}
            >
              <CardCharacter character={character.node} showDrawer={showDrawer} getCharacter={getCharacter} />
            </Col>
          ))}
        </Row>
        <Drawer
          visible={visible}
          onClose={onClose}
          title={charName}
          placement="right"
          drawerStyle={DrawerStyle}
        >
          <Tags color="#FCA311" title="General" general={general} type="general"  />
          <Tags color="#14213D" title="Films & Directors" general={films} type="films"  />
          <Tags color="#A26402" title="Planets" general={planets} type="planets"  />


        </Drawer>
      </Layout>

      
    </>
  );
}


export async function getStaticProps() {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: "https://swapi.loquenecesito.co/graphql/",
    }),
    cache: new InMemoryCache(),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    },
    credentials: "omit",
  });
  const data = await client
    .query({
      query: gql`
        query {
          allPeople {
            edges {
              node {
                id
                name
                gender
                birthYear
                height
                mass
              }
            }
          }
        }
      `,
    })
    .then((data) => data.data)
    .catch((error) => console.error(error));
  return {
    props: {
      characters: data.allPeople.edges,
    },
  };
}
