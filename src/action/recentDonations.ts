"use server";

export default async function RecentDonations(): Promise<any> {
    return new Promise(async (resolve, reject) => {
        fetch(process.env.BACKEND + "/recent-donations")
            .then(res => res.json())
            .then(res => {
                return resolve(res.donations);
            })
            .catch(e => {
                return reject({ status: false });
            });
    });
}
