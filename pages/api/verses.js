// bible api docs:
// https://www.rkeplin.com/the-holy-bible-open-source-rest-api/

export default function handler(req, res) {
    return new Promise((resolve, reject) => {
        const query = req.query;
        const { bookId, chapterId, version } = query;
        
        fetch(`https://bible-go-api.rkeplin.com/v1/books/${bookId}/chapters/${chapterId}?translation=${version}`)
        .then((res) => res.json())
        .then((data) => {            
            for (var i = 0; i < data.length; i++) {
                data[i].verse = data[i].verse.replace('"', '');
            }

            if (data)
                res.status(200).json(data);
            else
                res.status(404).json({ text: 'Verses not found' });

            resolve();
        }).catch(error => {
            res.status(405).json(error);
            resolve();
        });
    })
}
  