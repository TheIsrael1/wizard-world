import Card from "@/Components/Card";
import { pageProps } from "@/types";
import Link from "next/link";
import React, { useMemo, useState } from "react";

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Elixirs`);
  const elixirs = await res.json();

  return {
    props: {
      elixirs,
    },
  };
}

const Elixirs = ({ elixirs }: pageProps) => {
  const [searchValue, setSearchValue] = useState("");

  const filteredElixirs = useMemo(() => {
    const res = elixirs?.filter((i) => {
      return (
        i?.name.toLowerCase().includes(searchValue.trim().toLowerCase()) ||
        i?.difficulty.toLowerCase().includes(searchValue.trim().toLowerCase())
      );
    });
    return res;
  }, [searchValue, elixirs]);

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-[32px] font-bold">Elixirs</h3>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search by name and difficulty"
        className="w-full sm:max-w-[300px] px-2 py-4 rounded-[4px]"
      />
      <div className="grid grid-cols-2 md:grid-cols-4  lg:grid-cols-5 gap-4 flex-wrap">
        {filteredElixirs?.map((elx, idx) => (
          <Link key={idx} href={`/elixirs/${elx.id}`}>
            <div className="w-full hover:scale-105 transition-transform">
              <Card>
                <div className="text-[14px] my-2 whitespace-nowrap truncate">
                  <span>{elx?.name}</span>
                </div>
              </Card>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Elixirs;
