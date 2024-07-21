"use server";

export default async function CreateNewVod(url: string, name: string, userid: string): Promise<string> {
    return new Promise((resolve, reject) => { 
        try {
            fetch(`${process.env.VOD_SERVER}/api/videos/new`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'x-vod-api-key': process.env.VOD_API_KEY!,
                },
                body: JSON.stringify({
                    url,
                    name,
                    userid
                })
            })
            .then(res => res.json())
            .then((data) => {
                if (data.success) {
                    return resolve(data.data.hash);
                } else {
                    return reject(data.message);
                }
            });
        } catch (error) {
            return reject(error);
        }
    });
}