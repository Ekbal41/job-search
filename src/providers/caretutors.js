import { PlaywrightCrawler } from 'crawlee';

const jobData = [];

const jobCrawler = new PlaywrightCrawler({
  requestHandler: async ({ page }) => {
    try {
      // Wait for elements with class "single-job" to render.
      await page.waitForSelector('.single-job');

      // Extract the job elements with class "single-job".
      const jobElements = await page.$$('.single-job');

      for (const jobElement of jobElements) {
        const jobTitle = await jobElement.$eval('.sj_title div div div a h1', el => el.textContent.trim());
        const jobIdAndDate = await jobElement.$$eval('.sj_title div div div p span', els => els.map(span => span.textContent.trim()));
        const jobDetails = await jobElement.$$eval('.sj-content div div div ul li', els => els.map(span => span.textContent.trim()));
        const jobGender = await jobElement.$eval('.sj-footer div div div p', el => el.textContent.trim());

        // Create a job object and push it to the jobData array.
        const job = {
          title: jobTitle,
          id: jobIdAndDate[0].replace('Job ID : ', ''),
          postedDate: jobIdAndDate[2].replace('Posted Date : ', ''),
          tuitionType: jobDetails[0].replace('Tuition Type', '').trim(),
          salary: jobDetails[1].replace('Salary', '').trim(),
          subjects: jobDetails[2].replace('Subjects', '').trim(),
          location: jobDetails[3].replace('Location', '').trim(),
          gender: jobGender.replace('Any tutor preferred', 'Any').trim() // Update this as per your requirement
        };

        // Push the job object to the jobData array.
        jobData.push(job);
      }
    } catch (error) {
      console.error('Error during scraping jobs:', error);
    }
  },
});
// await jobCrawler.run(['https://caretutors.com/job/list']);

// const jobDetailsUrl = `https://caretutors.com/job/view/${id}/${title}`;


const jobDetailsCrawler = new PlaywrightCrawler({
  requestHandler: async ({ page }) => {
    try {
      // Wait for elements with class "sj-wrapper" to render.
      await page.waitForSelector('.sj-wrapper');

      // Extract the job element with class "sj-wrapper".
      const jobElement = await page.$('.sj-wrapper');
      const jobDetails = await jobElement.$$eval('ul li', els => {
        return els.map(span => span.textContent.trim());
      });

      // Format the job details into a JSON object with descriptive properties.
      const formattedJobDetails = {
        tuitionType: jobDetails[0],
        studentGender: jobDetails[1],
        preferredTutor: jobDetails[2],
        tutoringTime: jobDetails[3],
        tutoringDays: jobDetails[4],
        numberOfStudents: jobDetails[5],
        salary: jobDetails[6],
        subjects: jobDetails[7],
        location: jobDetails[8],
      };

      // Output the formatted job details as a JSON object.
      console.log(JSON.stringify(formattedJobDetails, null, 2));
    } catch (error) {
      // Handle any errors that occur during the scraping process.
      console.error('Error during scraping:', error);
    }
  },
});

await jobDetailsCrawler.run(['https://caretutors.com/job/view/115089/Need-Admission-Test-Tutor-for-Medical-College-Admission-Test-Student-3-DaysWeek']);
