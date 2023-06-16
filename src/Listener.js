class Listener {
  constructor(playlistsService, mailSender) {
    this.playlistsService = playlistsService;
    this.mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());
      const notes = await this.playlistsService.getPlaylistSongs(playlistId);
      const resultMialSending = await this.mailSender.sendEmail(targetEmail, JSON.stringify(notes));
      console.log(resultMialSending.response);
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = Listener;
