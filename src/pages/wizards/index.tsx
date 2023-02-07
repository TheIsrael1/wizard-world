import Card from "@/Components/Card";
import { pageProps } from "@/types";
import Link from "next/link";
import React, { useMemo, useState } from "react";

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Wizards`);
  const wizards = await res.json();

  return {
    props: {
      wizards,
    },
  };
}

const Wizards = ({ wizards }: pageProps) => {
  const [searchValue, setSearchValue] = useState("");

  const filteredWizards = useMemo(() => {
    const res = wizards?.filter((i) =>
      `${i?.firstName} ${i.lastName}`
        ?.toLowerCase()
        .includes(searchValue.trim().toLowerCase())
    );
    return res;
  }, [searchValue, wizards]);

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-[32px] font-bold">Wizards</h3>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search wizard by name"
        className="w-full sm:max-w-[300px] px-2 py-4 rounded-[4px]"
      />
      <div className="grid grid-cols-2 md:grid-cols-4  lg:grid-cols-5 gap-4 flex-wrap">
        {filteredWizards?.map((wiz, idx) => (
          <Link key={idx} href={`/wizards/${wiz.id}`}>
            <div className="w-full hover:scale-105 transition-transform">
              <Card>
                <div className="text-[14px] my-2 whitespace-nowrap truncate">
                  <span>
                    {wiz?.firstName} {wiz?.lastName}
                  </span>
                </div>
              </Card>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Wizards;
