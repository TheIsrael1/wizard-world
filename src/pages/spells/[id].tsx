import { pageProps, SpellsInterface } from "@/types";
import { getRandomColor, VerifyData } from "@/util";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Spells`);
  const spells = (await res.json()) as SpellsInterface[];

  return {
    paths: spells?.map((spell) => ({
      params: { id: spell?.id },
    })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id = "" } = params as IParams;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Spells/${id}`);
  const spell = await res.json();

  return {
    props: {
      spell,
    },
  };
};

const SingleSpell = ({ spell }: pageProps) => {
  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-[32px] font-bold">{spell.name}</h3>
      <div
        className="w-full h-[25vh] rounded-[8px]"
        style={{ backgroundColor: getRandomColor() }}
      ></div>
      <div className="flex flex-col gap-4">
        <h5 className="text-[20px] font-bold">Spell Details :)</h5>
        <ul className="gap-2 text-[16px] sm:text-[18px]">
          <li>
            <span className="font-bold">Name</span> - {VerifyData(spell.name)}
          </li>
          <li>
            <span className="font-bold">Incantation</span> -{" "}
            {VerifyData(spell.incatation)}
          </li>
          <li>
            <span className="font-bold">Effect</span> -{" "}
            {VerifyData(spell.effect)}
          </li>
          <li>
            <span className="font-bold">Can Be Verbal</span> -{" "}
            {spell.canBeVerbal ? `True` : `False`}
          </li>
          <li>
            <span className="font-bold">Light</span> - {VerifyData(spell.light)}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SingleSpell;
