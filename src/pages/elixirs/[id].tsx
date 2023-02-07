import { pageProps, ElixirsInterface } from "@/types";
import { getRandomColor, VerifyData } from "@/util";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Elixirs`);
  const elixirs = (await res.json()) as ElixirsInterface[];

  return {
    paths: elixirs?.map((elx) => ({
      params: { id: elx?.id },
    })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id = "" } = params as IParams;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Elixirs/${id}`);
  const elixir = await res.json();

  return {
    props: {
      elixir,
    },
  };
};

const SingleElixir = ({ elixir }: pageProps) => {
  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-[32px] font-bold">{elixir.name}</h3>
      <div
        className="w-full h-[25vh] rounded-[8px]"
        style={{ backgroundColor: getRandomColor() }}
      ></div>
      <div className="flex flex-col gap-4">
        <h5 className="text-[20px] font-bold">Elixir Details :)</h5>
        <ul className="gap-2 text-[16px] sm:text-[18px]">
          <li>
            <span className="font-bold">Name</span> - {VerifyData(elixir.name)}
          </li>
          <li>
            <span className="font-bold">Effect</span> -{" "}
            {VerifyData(elixir.effect)}
          </li>
          <li>
            <span className="font-bold">Side Effects</span> -{" "}
            {VerifyData(elixir.sideEffects)}
          </li>
          <li>
            <span className="font-bold">Characteristics</span> -{" "}
            {VerifyData(elixir?.characteristics)}
          </li>
          <li>
            <span className="font-bold">Time</span> - {VerifyData(elixir.time)}
          </li>
          <li>
            <span className="font-bold">Difficulty</span> -{" "}
            {VerifyData(elixir.difficulty)}
          </li>
          <li>
            <span className="font-bold">Ingredients:</span>
            {elixir?.ingredients?.length ? (
              <ol>
                {elixir?.ingredients?.map((i, idx) => (
                  <li key={idx}>{i.name}</li>
                ))}
              </ol>
            ) : (
              `No ingredients`
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SingleElixir;
