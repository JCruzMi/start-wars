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
          people(id: "${search}") {
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
    })
    const data = request.data.people.films.edges
    res.status(200).json({ films: data , error: null });
  } catch (error) {
    if (error.message === "No entry in local cache for") {
      res.status(404).json({ films: null, error: "No character found" });
    } else {
      res
        .status(500)
        .json({ films: null, error: error.message });
    }
  }
};