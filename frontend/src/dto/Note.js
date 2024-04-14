export class Note {
  constructor(id, title, content, updated_at) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.updated_at = updated_at;
  }

  display() {
    console.log(
      `ID: ${this.id}, Title: ${this.title}, Content: ${this.content}, Updated: ${this.updated_at}`
    );
  }
}
