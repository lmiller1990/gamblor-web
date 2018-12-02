## The Kelly Criterion

Once you identify a good market, the next step is deciding how much you want to bet. We use the _expected value_ to get a mathematical edige in identifying good markets - and we want a similar edge when it comes to placing a bet. Queue the _kelly criterion_.

The idea of the kelly criterion is to determine what percentage of your bankroll to bet, taking into account the probability of winning and the value of the odds with respect ot that probability. This value is called the _overlay_. Let's see an example, using real data from the 2018 World Championship final.

## Fnatic (FNC) vs Invictus Gaming (IG) for first turret

Odds are: 
- FNC: 2.0
- IG: 1.72 

The EV works out to FNC @ 1.08 and IG @ 0.79, taking into considering their previous 12 games prior to the finals.  Let's say our bankroll is $1000. I got these odds on LCS Tracking, of course:

![](https://cdn-images-1.medium.com/max/800/1*ZQdpil3vm41GgNVKDaiRYg.png)

First, we calculate the overlay. This is calcuated using the formula EV - 1. So it works out to:

- FNC: 0.08
- IG: -0.21

Now we have the overlay, we can calculate the kelly criterion by the following formula: bankroll * (overlay / (odds - 1)). So we get:

- FNC: (1000 * (0.08 / (2-1)) = $80
- IG: (1000 * (-0.21 / (1.72-1)) = -$291

Obviously since IG's EV was already below 1, we wouldn't consider this bet. The recommended bet for FNC is $80.

An implementation in code would look something like this:

```ts
function fullKelly(bankroll: number, ev: number, odds: number): number {
  const overlay = calcOverlay(ev)
  return Math.ceil(bankroll * (overlay / (odds - 1)))
}

export function calcOverlay(ev: number): number {
  return parseFloat((ev - 1).toFixed(2))
}
```

The kelly criterion has it's problems, though. The main one is the recommendations are pretty signficant portions of your bankroll - considering FNC did not get FT in any of the three games, you would have lost $240 - a quarter of your payroll. Another disadvantage is if you want to bet on many markets, you may end up betting most of your payroll at the same time.

The kelly criterion we used here is the _full kelly_. The _fractional kelly_ is another safer alternative, that addresses some of the above criticisms.

## The Fractional Kelly

The fraction kelly is basically just percentage of a full kelly. I like to go with 20%. So that means our above bet on FNC now becomes $16. Much more reasonable - we can afford to lose $16, and it fees up our bankroll to bet on other makrets at the same time. We can recycle the above code, and write a `fractionalKelly` function:

```ts
function fractionalKelly(bankroll: number, ev: number, odds: number, fraction: number): number {
  return fullKelly(bankroll, ev, odds) * fraction
}
```

The fraction kelly reduces your risk, and also allows you to bet on many markets at once. 

## The Fractional Kelly in LCS Tracking

I recently updated my web app, [LCS Tracking](https://lcs-tracking.herokuapp.com/) to automatically calculate a fractionally kelly over based on a team's game history. You can even change the percentage you want to use - I find 20% is a good default. Once you simulate a bet, you can click help:

![](https://cdn-images-1.medium.com/max/800/1*v-rhysjcZ-9PHlZ7zTSpuA.png)

And you a presented with a modal, giving you the approximate bets for a 20% fractional kelly, as well as some helpful messages and the ability to set your own fraction:

![](https://cdn-images-1.medium.com/max/800/1*cu0crWjNSPrj_sCSJzoUaw.png)

As always, the more data you have on a team, the better.
