/* eslint-disable import/no-anonymous-default-export */
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://swapi.loquenecesito.co/graphql/",
  }),
  cache: new InMemoryCache(),
});

export default async (req, res) => {
  const search = req.body;
  console.log(search);
  try {
    const request = await client.query({
      query: gql`
        query {
            people: people(id: "${search}") {
                birthYear
                eyeColor
                gender
                hairColor
                height
                mass
                skinColor
            }
            planetas: people(id: "${search}") {
                films {
                edges {
                    node {
                    planets {
                        edges {
                        node {
                            name
                        }
                        }
                    }
                    }
                }
                }
            }
            pelis: people(id: "${search}") {
            films {
              edges {
                node {
                  title
                  director {
                    name
                  }
                }
              }
            }
          }
        }
      `,
    });
    const data = request.data.planetas.films.edges;
    const data2 = request.data.pelis.films.edges;
    const data1 = request.data.people;

    res
      .status(200)
      .json({ general: data1, planetas: data, pelis: data2, error: null });
  } catch (error) {
    if (error.message === "No entry in local cache for") {
      res
        .status(404)
        .json({
          general: null,
          planetas: null,
          pelis: null,
          error: "No character found",
        });
    } else {
      res
        .status(500)
        .json({
          general: null,
          planetas: null,
          pelis: null,
          error: error.message,
        });
    }
  }
};
