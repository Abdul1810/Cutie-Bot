const nekoclient = require('nekos.life')
const neko = new nekoclient()

module.exports = {
	async GetKissGif () {
		const KissGif = await neko.sfw.kiss()
		return KissGif.url
	},

	async GetHugGif () {
		const HugGif = await neko.sfw.hug()
		return HugGif.url
	},

	async GetTickleGif () {
		const TikcleGif = await neko.sfw.tickle()
		return TikcleGif.url
	},

	async GetPatGif () {
		const PatGif = await neko.sfw.pat()
		return PatGif.url
	},

	async GetWallpaper () {
		const Wallpaper = await neko.sfw.wallpaper()
		return Wallpaper.url
	},

	async GetSlapGif () {
		const SlapGif = await neko.sfw.slap()
		return SlapGif.url
	},

	async GetCatGif () {
		const CatGif = await neko.sfw.meow()
		return CatGif.url
	},

	async GetDogGif () {
		const DogGif = await neko.sfw.woof()
		return DogGif.url
	},

	async GetFeedGif () {
		const FeedGif = await neko.sfw.feed()
		return FeedGif.url
	},

	async GetAnimeAvatar () {
		const AnimeAvatar = await neko.sfw.avatar()
		return AnimeAvatar.url
	},

	async GetSmugGif () {
		const SumgGif = await neko.sfw.smug()
		return SumgGif.url
	},

	async GetBakaGif () {
		const BakaGif = await neko.sfw.baka()
		return BakaGif.url
	},

	async GetNekoPic () {
		const NekoPic = await neko.sfw.neko()
		return NekoPic.url
	},

	async GetNekoGif () {
		const NekoGif = await neko.sfw.nekoGif()
		return NekoGif.url
	},

	async GetCuddleGif () {
		const CuddleGif = await neko.sfw.cuddle()
		return CuddleGif.url
	},

	async GetFoxGirlGif () {
		const FoxGirlGif = await neko.sfw.foxGirl()
		return FoxGirlGif.url
	}
}