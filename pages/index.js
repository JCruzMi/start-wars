import { useRouter } from "next/router";

/* ==== antd ==== */
import { Row, Col, Divider, Drawer, Pagination } from "antd";

const style = { display: "flex", justifyContent: "center" };
/* ==== Apollo ==== */

import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";

import Layout from "../components/Layout";
import Tags from "../components/Tags";
import CardCharacter from "../components/CardCharacter.jsx";

import { useState, useEffect } from "react";


const styleDivider = {
  color: "#FFF",
  fontSize: "24",
  fontWeight: "bold",
  marginBottom: "2rem",
}
const DrawerStyle = {
  backgroundColor: "#E5E5E5",
}

const stylePagination = {
  display: "flex",
  justifyContent: "center",
  marginTop: "2rem"
}

export default function Home(results) {

  const initialState = results;
  const [characters] = useState(initialState.characters);
  const [visible, setVisible] = useState(false)
  const [charName, setCharName] = useState("")
  const [general, setGeneral] = useState([])
  const [films, setFilms] = useState([])
  const [planets, setPlanets] = useState([])
  
  
  const [pagination, setPagination] = useState(characters.slice(0, 12))
  const perPage = 12
  
  const router = useRouter();

  
  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    router.push("/")
    setVisible(false)
  };

  const paginar = (pagina) => {
    setPagination(characters.slice((pagina - 1) * perPage, pagina * perPage))
  }

  const onChange = (e) => {
    window.scrollTo(0, 0)
    paginar(e)
  }

  const getCharacter = async (currencyCode) => {
    if (currencyCode !== undefined) {

      const filmsL = await fetch("api/test", {
        method: "post",
        body: currencyCode
      })
      const {pelis, planetas, general} = await filmsL.json()

      setPlanets(planetas)
      setFilms(pelis)
      setGeneral(general)
      setCharName(general.name)
    } else {
      console.log("no hay code")
    }
  }
  
  useEffect(() =>{
    if(router.asPath != "/" && general.length == 0) {
      showDrawer()
      if (visible){
        getCharacter(router.asPath.slice(1,router.asPath.length))
      }
  
    } else if(router.asPath == "/" && general.length != 0) {
      setGeneral([])
      setFilms([])
      setPlanets([])
      setVisible(false)
    }
  },[router,visible,general])


  return (
    <>
      <Layout title="Star Wars | Characters">
        <Divider orientation="left" style={styleDivider}>Characters</Divider>
        <Row gutter={[30, 30]}>
          {pagination.map((character) => (
            <Col
              key={character.node.id}
              className="gutter-row"
              xs={24}
              sm={12}
              md={12}
              lg={6}
              style={style}
            >
              <CardCharacter character={character.node} />
            </Col>
          ))}
        </Row>
        <Pagination defaultCurrent={1} total={characters.length} pageSize={perPage} onChange={onChange} showSizeChanger={false} style={stylePagination}/>
        <Drawer
          width={370}
          visible={visible}
          onClose={onClose}
          title={charName}
          placement="right"
          drawerStyle={DrawerStyle}
        >
          <Tags visible={visible} color="#FCA311" title="General" general={general} type="general"  />
          <Tags visible={visible} color="#14213D" title="Films & Directors" general={films} type="films"  />
          <Tags visible={visible} color="#A26402" title="Planets" general={planets} type="planets"  />
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
