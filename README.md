# CleanHub Coding Challenge

A small app that renders a list of Cleanhub hubs with filter functionality.

This project was created using:

- Create React App + Typescript
- React Material UI
- Jest & Testing Library
- SASS

Minimum Node version: v14

## Instructions for local development:

Install packages:

```
npm i
```

Start locally: (runs on localhost:3000)

```
npm start
```

Run tests:

```
npm test
```

Other commands available in `package.json`

## Decision points

- **Why use a component library (MUI)?**

In order to iterate faster on the design I had in mind, I decided to use MUI (Despite this, it still took me longer than 3 hours 🥲). I've had experience with this library before and I also noticed that the CleanHub website uses it as well.

In my opinion, it's not wrong to use one and although it doesn't completely showcase the fact that I can build components and style them from scratch, I think the end results also matter. I know which props will get me the result I want. It's not the best-looking list out there, but it works, it's accessible and it does what it's supposed to.

- **Why does the filter work this way?**

<details>
<summary>
I built the filters in a way that made sense to me, so if we had opposing ideas I'd be interested in hearing your thoughts! (If by the end we turned out to be on the same page, just pretend you didn't just read a wall of text :D)
</summary>
<br>

> the filters function independently, therefore a change in one should not affect the possible values of another filter (response from the email)

From my understanding, the requirements for the filter logic is the reverse of what a typical "filter" was meant to do. I understood it as being "inclusive", meaning the more you enable the filters, the more items you see as a result (e.g. if you choose 'India' as the filter location and a minimum of 500kg of plastic collected as input, you'll see all hubs based in India and all hubs that have collected at least 500kg, regardless if they were based in India or not). With this implementation, the user will never get to the "empty" state.

This had the issue where I felt like it was not intuitive. This approach meant that all filters always have to be enabled. Implementation-wise, I simply had trouble making it work without running into edge cases.

In contrast, the more common filter logic is to reduce the amount of results and filters you can interact with.
(e.g. if you choose 'India' as the filter location, and a minimum of 500kg of plastic collected as input, you will only see hubs that are based in India AND has collected at least 500kg). With this, you may end up seeing an empty state.

I chose properties that, as a user, would give them the information that they might look for, should this app somehow finds its way to production. For example, the `assignable` property might make sense internally from within CleanHub but utterly useless for everyone else.

At the same time, each item in the list do not contain a lot of info. This is also on purpose. The point of pages like these is to just give enough information, not to bombard the user.

</details>

## Areas of improvement

- Adding more tests
