"use server";

export default async function GetStreamer(streamer: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        fetch(process.env.BACKEND + "/get-streamer" + `?username=${streamer}`)
            .then(res => res.json())
            .then(res => {
                return resolve(res);
            })
            .catch(e => {
                return reject({ status: false });
            });
    });
}
