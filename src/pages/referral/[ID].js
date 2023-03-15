import { useRouter } from "next/router";

const { query, push } = useRouter();

dispatch({
  type : "Modify ID",
  payload : {
    ID : query
  }
})

push("/")