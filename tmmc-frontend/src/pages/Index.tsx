import Snow from "../styles/Snow";
import { Container } from "../styles/IndexStyle";
import IndexMain from "../components/Index/IndexMain";
import { useState } from "react";
import SignUp from "../components/Index/SignUp";
import { Category } from "../interface/indexInterface";
import Login from "../components/Index/Login";
import Complete from "../components/Index/Complete";

export default function Index() {
  const [category, setCategory] = useState<Category>(Category.Index);
  return (
    <Container>
      {category === Category.Index ? (
        <IndexMain setCategory={setCategory} />
      ) : category === Category.Login ? (
        <Login setCategory={setCategory} />
      ) : category === Category.SignUp ? (
        <SignUp setCategory={setCategory} />
      ) : category === Category.Complete ? (
        <Complete setCategory={setCategory} />
      ) : (
        <></>
      )}
      <Snow />
    </Container>
  );
}
