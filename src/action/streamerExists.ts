"use server";

interface StreamerExists {
    status: Boolean;
}

export default async function StreamerExists(streamer: string): Promise<StreamerExists> {
    return new Promise(async (resolve, reject) => {
        fetch(process.env.BACKEND + "/streamer-exists", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ streamer }),
        })
            .then(res => res.json())
            .then(res => {
                return resolve({ status: res.status });
            })
            .catch(e => {
                return reject({ status: false });
            });
    });
}
