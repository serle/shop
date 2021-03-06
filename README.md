# Project

A quick demo React/GraphQL project showing a responsive GridList of clothing items for a dummy retail store front    

## Technologies

1) Typescript
2) React Functional Components with hooks
3) Apollo Client Hooks
4) Material UI hooks
5) React Testing Library 
6) Creating production Docker & Docker-Compose assets 

## Install

### Development Environment

1) Clone the repository into a local folder: git clone https://github.com/serle/shop.git
2) Start the graphql server: docker run --name server -d chrismns/tech-test-mock-server:0.1.0
3) Start the development server: npm start
4) Open the browser on: http://localhost:3000 

### Containerised Production Environment

1) Copy the docker-compose file from the git repository, if you have not already cloned the whole repository
2) Change into the directory where the docker-compose.yaml file resides
3) At the  command promp run: docker-compose up
4) Open the browser on: http://localhost:8080

## Notes

1) I took the opportunity to move from enzyme (my normal testing library) to react-testing-library as I was keen learn 
take advantage of the less brittle testing approach. It took a while to fix framework versioning issues, but
the basic setup works. I did not focus on UI testing beyond "it renders the component". Next steps would be to 
add accessibility roles to UI element and use them to find elements and test the UI properly. Ideally this should be 
done based on business scenario requirements. 
2) I exploited React functional patterns and went for function composition over the old class based approach.
3) I exploited folder structure to created higher order components and went for single responsibility per file to avoid clutter
4) I ran into a jest issue with test file naming conversion, but I circumvented this with the _.test.tsx naming convention,
which worked well in my IDE as the test file was always at the top.
5) I ran into an issue where the graphql Product type is different when called from the productQuery or 
productListQuery, this would need to be fixed by the server team. I just removed the offer_ids field from the product query
as apollo's cache normalisation was causing downstream issues when I made the productQuery call.
6) I opted for material-ui and css in js to localise css per component and exploited material-ui.
7) I ran into the material-ui differences between dev and prod and fixed this with the extra index parameter on makeStyles.
8) In general, I would add far more testing and edge cases, but I established the e2e testing pattern as an initial base. Not quite 
sure if the badge algorithm is correct, I would need to look at more scenarios and unpack it more. 
9) I felt the apollo mocking testing pattern would cause too much test data creation work, and thought the e2e approach 
was better for now.
10) UI could be improved, but got the basics displayed.
11) I put the userId in as a default parameter so that and Auth component could wrap the ProductList at a later stage.
12) I just used a simple loading and error paragraph for the graphql loading and error components. 
13) From a performance perspective, I would look at the suspense api to handle slow image loads as well as look and list
virtualisation to re reduce over-fetching.
14) UserBadgedOffers calculation could also be moved to only execute once and componentDidMount in a useEffect call.

## Time

1) Environment Setup and debugging issues: 4 hours
2) Development: 3 hours
3) Dockerising: 20 min    