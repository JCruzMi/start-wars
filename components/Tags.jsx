import { Tag, Divider } from "antd";
import { useState, useEffect } from "react";

const items = [];


const style = {
  padding: ".4rem 1rem",
  display: "flex",
  justifyContent: "space-between",
  borderRadius: "4px"
};

const styleSpan = {
  display: "flex",


}

const styleContainer = {
  display: "grid",
  gridTemplateColumns: "auto auto",
  gap: "1rem",
  wordWrap: "break-word",
};

export default function Tags({ title, general, color, type }) {

  var filter = []
  if (type == "general"){
    filter = (Object.entries(general).filter(([key, value]) => key != "__typename"))

  }else if (type == "films"){
    var li = {}
    general.map((item) => {
      li[item.node.title] = ""
      li[item.node.director.name] = "" 
    }) 
    filter = (Object.entries(li).filter(([key, value]) => key != "__typename"))
  }else if (type == "planets"){
    var li = {}
    general.map((item) => {
       item.node.planets.edges.map((planet)=> {
         li[planet.node.name]=""
       })
     })
    filter = (Object.entries(li).filter(([key, value]) => key != "__typename"))
  }


  return (
    <>
      <Divider>{title}</Divider>
      <div style={styleContainer}>
        {
          filter.map(([key, value]) => {
          return (
            <>
              
              <Tag color={color} key={key} style={style}>
                <span style={styleSpan}>{key}</span> <span style={styleSpan}>{value}</span>
              </Tag>

            </>
          );
        })}
      </div>
    </>
  );
}
