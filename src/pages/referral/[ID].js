import { store } from "@/store";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function Id () {
  const { query, push } = useRouter();
  const { dispatch } = useContext(store);

  useEffect(() => {
    dispatch({
      type : "Modify ID",
      payload : {
        ID : query.ID
      }
    })
    
    push("/")
  }, [])

  return (
    <></>
  )
}