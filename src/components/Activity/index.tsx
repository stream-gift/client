"use client";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import Table from "../Table";
import "./activity.scss";

export default function Activity() {
    async function TestAPI() {
        console.log(1234);
        const client = new SuiClient({
            url: `https://sui-mainnet.blockvision.org/v1/2gAg1EDtAPb4PdXRqCiDYLOWnvd`,
        });
        // get tokens from the DevNet faucet server
        let unsubscribe = await client.subscribeEvent({
            filter: {
                MoveEventModule: {
                    module: "position_manager",
                    package: "0x91bfbc386a41afcfd9b2533058d7e915a1d3829089cc268ff4333d54d6339ca1",
                },
            },
            // limit: 10

            onMessage: event => {
                console.log("subscribeEvent", JSON.stringify(event, null, 2));
            },
        });
        console.log(unsubscribe);
    }

    return (
        <div
            className="
                rounded-md border-white border-[1px] bg-[#0A0A0A]
                w-[75%] mt-12"
        >
            <button onClick={TestAPI}>Test</button>
            <Table
                cols={[{ name: "Title" }, { name: "Year" }]}
                data={[
                    {
                        id: 1,
                        title: "Beetlejuice",
                        year: "1988",
                    },
                    {
                        id: 2,
                        title: "Ghostbusters",
                        year: "1984",
                    },
                ]}
            />
        </div>
    );
}
