"use server";

export default async function CheckDonations(username: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        fetch(process.env.BACKEND + `/check_new_donations?username=${username}`)
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
