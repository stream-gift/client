"use server";

export default async function Donate(
    streamer_username: string,
    hash: string,
    sender: string,
    message?: string,
): Promise<any> {
    return new Promise(async (resolve, reject) => {
        fetch(
            process.env.BACKEND +
                `/incoming_donation?streamer=${streamer_username}&network=theta&tx_hash=${hash}&sender=${sender}&message=${message}`,
        )
            .then(res => res.json())
            .then(res => {
                return resolve(res);
            })
            .catch(e => {
                console.log(e);
                return reject({ status: false });
            });
    });
}
