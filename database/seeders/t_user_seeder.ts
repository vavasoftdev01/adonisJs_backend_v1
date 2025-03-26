import TUser from '#models/t_user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker';

export default class extends BaseSeeder {

  async run() {
    let fakeData = [];

    for (let index = 0; index < 1000; index++) {
      fakeData.push({
        name: faker.person.fullName(),
        job_title: faker.person.jobTitle(),
        job_desc: faker.person.jobDescriptor(),
        zodiac_sign: faker.person.zodiacSign(),
        gender: faker.person.gender(),
      })
    }

    await TUser.truncate();
    await TUser.createMany(fakeData)
  }
}