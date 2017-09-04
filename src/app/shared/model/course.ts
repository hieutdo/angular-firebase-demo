export class Course {
  constructor(
    public $key: string,
    public url: string,
    public description: string,
    public iconUrl: string,
    public courseListIcon: string,
    public longDescription: string
  ) {}

  static fromJson(json): Course {
    return new Course(
      json.$key,
      json.url,
      json.description,
      json.iconUrl,
      json.courseListIcon,
      json.longDescription
    );
  }

  static fromJsonArray(array: any[]): Course[] {
    return array.map(Course.fromJson);
  }
}
