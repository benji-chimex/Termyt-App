import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ID () {
  const { query, push } = useRouter();

  useEffect(() => {
    dispatch({
      type : "Modify ID",
      payload : {
        ID : query
      }
    })
    
    push("/")
  })

  return (
    <></>
  )
}