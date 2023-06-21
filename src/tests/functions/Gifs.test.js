import Gifs from "../../functions/Gifs";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();


describe("Gifs", () => {
    beforeEach(() => {
        fetch.resetMocks();
    }
    );

    it("should return gifs", async () => {
        const expected = [
            {
                gif_id: "1",
                title: "funny cat",
                url: "https;//giphy.com/gifs/funny-cat",
            },
            {
                gif_id: "2",
                title: "dogs",
                url: "https;//giphy.com/gifs/dogs",
            },
        ];

        fetchMock.mockResponseOnce(JSON.stringify({
            data: expected.map(({gif_id, title, url}) => ({
                id: gif_id,
                title,
                images: {
                    original: {url},
            }
            })),
        }));

        const result = await Gifs("&q=funny cat");

        expect(result).toEqual(expected);
    });

    it("should throw error when fetch fails", async () => {
        fetchMock.mockResponseOnce('', {status: 404});

        await expect(Gifs("&q=funny cat")).rejects.toThrow("HTTP error! status: 404");
    });
});
