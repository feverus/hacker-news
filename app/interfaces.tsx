export type NewsItem = {
	"by": string,
	"descendants": number,
	"id": number,
	"kids": number[],
	"score": number,
	"time": number,
	"title": string,
	"type": string,
	"url": string
}
export type CommentItem = {
	"by": string,
	"id": number,
	"kids"?: number[],
	"parent": number,
	"text": string,
	"time": number,
	"type": string,
}
