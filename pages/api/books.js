// bible api docs:
// https://www.rkeplin.com/the-holy-bible-open-source-rest-api/

export default function handler(req, res) {
    return new Promise((resolve, reject) => {
        fetch('https://bible-go-api.rkeplin.com/v1/books')
        .then((res) => res.json())
        .then((data) => {
            if (data)
                res.status(200).json(data);
            else
                res.status(404).json({ text: 'Books not found' });

            resolve();
        }).catch(error => {
            res.status(405).json(error);
            resolve();
        });
    })
    
}