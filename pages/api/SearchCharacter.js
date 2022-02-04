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
  try {
    const request = await client.query({
      query: gql`
        query {
          people(id: "${search}") {
            birthYear
            eyeColor
            gender
            hairColor
            height
            mass
            skinColor
          }
        }
      `,
    })
    res.status(200).json({ general: request.data.people, error: null });
  } catch (error) {
    if (error.message === "No entry in local cache for") {
      res.status(404).json({ general: null, error: "No character found" });
    } else {
      res
        .status(500)
        .json({ general: null, error: error.message });
    }
  }
};