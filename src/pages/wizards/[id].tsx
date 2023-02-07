import { pageProps, WizardInterface } from "@/types";
import { getRandomColor, VerifyData } from "@/util";
import { GetStaticProps } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Wizards`);
  const wizards = (await res.json()) as WizardInterface[];

  return {
    paths: wizards?.map((wiz) => ({
      params: { id: wiz?.id },
    })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id = "" } = params as IParams;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Wizards/${id}`);
  const wizard = await res.json();
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Spells`);
  const spells = await data.json();
  return {
    props: {
      wizard,
      spells,
    },
  };
};

const SingleWizard = ({ wizard, spells }: pageProps) => {
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const [selectedSpells, setSelectedSpells] = useState<string[]>([]);

  const handleAssign = () => {
    if (selectValue) {
      setSelectedSpells((prev) => {
        return [...prev, selectValue];
      });
      setSelectValue("");
      setAssignModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div
        className={`${
          assignModalOpen ? `flex` : `hidden`
        } fixed h-[100vh] items-center justify-center w-[100vw] top-0 left-0 bg-black/[0.5] backdrop-blur-sm transition`}
      >
        <div
          className="h-[50vh] w-[95%] sm:w-[80%] md:w-[35%] bg-white rounded-[8px]
          py-6 px-4 flex flex-col justify-between items-center text-black
        "
        >
          <h4 className="text-[20px] font-bold mb-4">Assign Spell</h4>
          <select
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
            className="w-full h-[40px] px-4 bg-white border border-black"
          >
            <option></option>
            {spells?.map((spell, idx) => (
              <option value={spell.name} key={idx}>
                {spell.name}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-4 w-full">
            <button
              onClick={() => setAssignModalOpen(false)}
              className="mb-12 px-8 py-2 bg-blue-700 text-white rounded-[8px]"
            >
              cancel
            </button>
            <button
              onClick={() => handleAssign()}
              className="mb-12 px-8 py-2 bg-blue-700 text-white rounded-[8px]"
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <h3 className="text-[32px] font-bold">
        Wizard {wizard?.firstName} {wizard?.lastName}
      </h3>
      <div
        className="w-full h-[25vh] rounded-[8px]"
        style={{ backgroundColor: getRandomColor() }}
      ></div>
      <div className="flex flex-col gap-4">
        <h5 className="text-[20px] font-bold">
          Wizard Details :)
          <button
            onClick={() => setAssignModalOpen(true)}
            className="px-8 py-1 mx-4 rounded-[8px] bg-white font-bold text-black text-[18px]"
          >
            Assign Spell
          </button>
        </h5>
        <ul className="gap-2 text-[16px] sm:text-[18px]">
          <li>
            <span className="font-bold">First Name</span> -{" "}
            {VerifyData(wizard.firstName)}
          </li>
          <li>
            <span className="font-bold">Last Name</span> -{" "}
            {VerifyData(wizard.lastName)}
          </li>
          {selectedSpells?.length ? (
            <li>
              <span className="font-bold">Spells:</span>{" "}
              {wizard?.elixirs.length ? (
                <ol>
                  {selectedSpells?.map((i, idx) => (
                    <li key={idx}>{i}</li>
                  ))}
                </ol>
              ) : (
                `No Elixir`
              )}
            </li>
          ) : (
            <></>
          )}
          <li>
            <span className="font-bold">Elixirs:</span>{" "}
            {wizard?.elixirs.length ? (
              <ol>
                {wizard?.elixirs?.map((i, idx) => (
                  <Link key={idx} href={`/elixirs/${i.id}`}>
                    <li className="text-blue-600 hover:underline">{i.name}</li>
                  </Link>
                ))}
              </ol>
            ) : (
              `No Elixir`
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SingleWizard;
