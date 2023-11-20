---
title: "Complexity Theory"
slug: "/tutorials/complexity"
---
# What is Complexity Theory?

## Contents

- [Easy](#easy)
- [Medium](#medium)
- [Hard](#hard)


### Easy

Pre-reqs: 
Audience: 
etc

This is an introductory tutorial about complexity theory. Complexity theory is an exciting branch of theoretical computer science which (misleadingly) is itself a branch of mathematics. In fact, I like to think of computer scientists as *lazy mathematicians* because they are largely pre-occupied with investigating how much of maths can be outsourced to computers. Complexity theory, roughly, is the study of how efficiently this outsourcing can be done so I call complexity theorists *lazy, impatient mathematicians*. More specifically, complexity theorists aim to *classify* problems by how much work is required to solve them. This classification reminds me of discovering the periodic table so I shall call it the **Periodic Table of Problems** (hence the name of the website).

The details of complexity theory get quite hairy and can be quite intimidating. I assume you're here because you're curious but not yet ready for the full technicalities. So this tutorial offers a very gently introduction to the field, mostly focusing on its historical development, underlying philosophy and high-level intution. If this is too basic for you - go and read [link].

(Some historical details have been embellished for your entertainment - if you want to know the real story, go read a book or something)

Alt: You know how chemistry is basically just taking a bunch of random materials that they call elements/molecules and smash them together and see whether any kind of cool explosion happens? Havent you always wished you could do that but with with imaginary computers with cool superpowers? Well guess what? Youre about to because you're here to learn **theoretical computer science**!!

#### Hilbert's Hubris

 ![Roaring 20s. source: https://greenroomdesign.com/blog/everything-you-need-to-know-about-the-roaring-20s-2/](./imgs/twenties.png)

It's the roaring 20s. While most of Europe is busy celebrating the end of WW1 and rapidly modernising, its mathematicians - who were mostly oblivious to whole war ordeal - are in the midst of a very different cultural transformation. The philosophy of [Formalism](https://en.wikipedia.org/wiki/Formalism_(philosophy_of_mathematics)) - the idea that maths is essentially just meaningless symbol shunting - has swept blackboards across the continent. More. The main leader of the Formalists was a German mathematician called David Hilbert (it was customary at this time for villains to be from Germany). Hilbert had a grand plan of reducing all of mathematics to a small number of special rules called *axioms*. At which point, he believed it would be possible to know all mathematical truths. His grand plan was known as "Hilbert's Program" and its slogan was "we *must* know, we *will* know". So he was a pretty modest guy. In 1928, Hilbert posed the following challenge:

>Find me a procedure to decide every mathematical statement!

In other words, Hilbert sought a mechanical process that takes in statements and outputs either "true" or "false" correctly, for all possible mathematic statements. You might be wondering what exactly is meant by "mechanical process" and in fact the first step to resolving Hilbert's challenge is to clarify exactly what counts as such a procedure. This is actually why I'm telling this story because it just so happened that a rigorous definition of "mechanical process" accidentally gave birth to the entire field of computer science!

Anyways, back to the story. It's briefly worth considering what the implications would be if Hilbert's challenge were succesful. Firstly, it would indeed mean that all mathematical knowledge was possible. Secondly, it would seem to put all mathematicians out of a job since all symbol shunting could now be outsourced to mechanical robots. While alluring for academic funding bodies, this would be a nail in the coffin for those who (like me) believe in the inherent creativity necessary for maths. If this were too easy, there'd be no point!

Fortunately, only one year later, Hilbert's program suffered a tremendous blow from a 23 year-old student named Kurt Gödel. In his PhD thesis, Gödel used some mind-bending [paradoxical wizardy](https://en.wikipedia.org/wiki/G%C3%B6del%27s_incompleteness_theorems#First_incompleteness_theorem) to show that whatever set of rules you tried to come up with, as long as they were able to talk about numbers, there would be a true statement that could be neither proven nor disproven. To give you an idea, Gödel's trick was basically to find a way of translating the sentence "this sentence is unprovable" into a statement about numbers!

A few years later, mathematicians Alonzo Church and Alan Turing independelty built on Gödel's result to finish off Hilbert's program. In both cases, this involved proposing a definition of mechanical procedure and then demonstrating certain fundamental limitations to such procedures. In both cases, such limitations implied that Hilbert's challenge was impossible. This was absolutely devastating for Hilbert's program and the philosophy of Formalism more generally. While some much milder forms continue to exist, this was a real point in favour of the ineffability of mathematical truth. 


#### Alan and the Machines

 So Hilbert's program was thwarted by Church and Turing's new mathematical definitions of mechanical process. It was soon noticed that these seemingly distinct definitions were actually just different ways of talking about the same thing. What was that thing? Nowadays, we call them "computers". You may have heard of them - they literally run the world.

 Turing's definition of a computer is called a [Turing Machine](https://www.youtube.com/watch?v=dNRDvLACg5Q) and is still in popular use today in theoretical computer science. Though I'll leave the fully precise definition for another time, the basic idea of a Turing Machine is something consisting of:
 1. An *infinitely* long tape filled with various symbols
 2. A little machine that whizzes back and forth along the tape
 3. A list of instructions that tell the machine what to do at every point. This conists of reading the symbol at the current tape position then deciding whether to write a new symbol at that position and then whether to move left or right.

 A bizzare AI generated interpretation of how I imagine a Turing machine looks like this:

 ![Turing Machine](./imgs/turing_machine.png)

Hope that helps!

The idea is that the tape serves as memory for the computer, while the program serves as the software. If you've done some coding, then you can think of the program being written in a very simple language. If you haven't done any coding, it's worth thinking a little bit about the sorts of things you could get a Turing machine to do using only commands of the form: "if the current tape symbol is $a$, write a $b$, move right and then ..."

The way we can get a Turing machine to do useful things is by writing a certain question - called the *input* - on the tape at the beginning and starting the machine off at the beginning of the input. Often, the program is written so it does something special when it's finished such as moving back to the beginning of the tape, potentially having modified what's written on it. For example, try and imagine how you'd write a program for a Turing machine to replace all $a$'s on the tape with $b$'s then go back to the beginning. Be careful - its surprisingly easy for a TM to get stuck in an infinite loop, for example by moving left forever. 

The first main point worth mentioning is that this definition clearly does not correspond exactly to how computers are actually built in real life. For one thing, it is impossible to build an infinitely long tape! The reason the definition requires an infinite tape is because it is a *theoretical model* of a computer so is focused on capturing the fundamental limits of computation. It would be strange to say that, in theory, there is a fundamental restriction on computers meaning they are not allowed to ever use more than 85389 tape cells. So instead, we allow a computer to use as much memory as it wants (at least for now...)
 
The other main difference is that this definition seems extremely primitive compared to the sophisticated sorts of computers we are used to with all their CPUs and GPUs and RAMs and whatever other components I forgot about immediately after my computer architecture course. This is no accident - the definition of a Turing Machine is intended to be as simple as possible. This is for two reasons:

1. It makes it much **easier to work with**. Stripping a computer all the way down to little cart on a tape makes it far easier to probe and understand. It also makes it much easier for me remember!
2. It makes it **more general**. Turing's definition was not intended to explore the limits of the available computers at the time (because in 1930, there weren't any!) Since then, the way we have built computers has changed an enourmous amount - from being the size of a room to fitting onto one's wrist - and so too have their capabilities. There's no point assuming a computer has to be built in a certain way since it will probably become redundant in about 10 years.

Hopefully I've convinced you that a Turing machine is a fairly simple and general model of a computer. In fact, there's a good chance you're worried that the definition is *too* simple. What's the point of studying such a primitive contraption? How could this ever match up to the supercomputers of today? Answer: very tediously! At the end of the day, everything a modern computer does is based off some software written in some programming language. Though programming languages differ a lot in appearance, they all boil down to performing the same basic operations: reading/writing data, branching ("if this, then do that, otherwise do something else") and looping ("do this, now do it again, and again ..."). So if you handed me a complicated computer program, then with enough time and coffee I could eventually produce a program for a Turing machine that does *exactly the same thing*. When this happens, we say the Turing machine *simulates* your program. The Turing machine might take a lot longer than your super-computer, but (at least for now) we are not interested in efficiency (how well something is done), merely *computability* (whether something can be done). 

Recall that Church's independent definition of a computer turned out to be equivalent (Turing's computers can simulate Church's and vice versa). We have since found many more examples of [equivalent definitions](https://en.wikipedia.org/wiki/Turing_completeness#Examples). But no one has ever been able to come up with a single definition that can do *more* than a Turing machine. So computer scientists have collectively decided that a Turing machine basically nails it in terms of what it means to be computable. They even give this idea a fancy name: the [Church-Turing Thesis](https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis). Despite the name, this is basically just a shared assumption. If you're unhappy with this, I strongly encourage you to try and come up with your own stronger definition - you'd probably kick off a new digital revolution!

CTT comes in very handy in practice because it is what allows computer scientists to get away with cutting a lot of corners in proofs. To show that a certain problem is solvable by a certain algorithm, rather than having to sit down and tediously work out all the boring details of whether your TM has to move left or right or whatever you can loosely describe how you could vaguely imagine being able to write some code in your favourite language. You can get away with saying things like "..." . See why I call them lazy mathematicians?

Its worth mentioning there are definitely still well defined problems that TMs *cant* solve. Thanks to a seriously cool result called [Rices theorem](https://en.wikipedia.org/wiki/Rice%27s_theorem), we know this includes any interesting question about what one computer thinks about the behaviour of another one. Though the most famous example of this (called the [Halting problem](https://en.wikipedia.org/wiki/Halting_problem)) is some self-referential mind-fuckery, this includes questions like "can this TM count to $10$?". The cool part is that the only way around is for one TM to directly simulate another one step by step. (The reason this doesnt solve the problem is because if the first TM loops forever, so too will the one simulating it). Rather than Rice's theorem, I feel like it should be called the *No Free Lunch theorem*. Because its kind of saying that answering interesting questions *requires* a certain amount of computational effort. Kind of like how thermodynamics began with the observation that useful work [requires a certain amount of energy to be put in](https://en.wikipedia.org/wiki/Second_law_of_thermodynamics#Kelvin_statements). But rather than focusing on the physical quantity of *energy*, we're talking about the abstract quantity of *computation*. If you like the sound of that, then I have some good news and some bad news. Terminology: finding a necessary amount of computing *resource* for solving a certain problem is called a lower bound. The good news is that complexity theory is **all** about finding lower bounds. The bad news is that complexity theoresists are really bad proving them... 

Define R/RE here?

#### Gödel's Guessing Game

Let's return to the history. You might have thought the destruction of Hilbert's Program was enough for our young Turing and Gödel. Turns out this was only the beginning of their careers. When WWII arrived, Turing was called in to save the world from the Nazis. With the aid of his machines, he succesfully did so by cracking their secret code system called [Enigma](https://en.wikipedia.org/wiki/Enigma_machine_) and helping speed up the end of the war. His efforts were rewarded by ... *checks notes* ... being [criminally convincted](https://en.wikipedia.org/wiki/Alan_Turing#Homosexuality_and_indecency_conviction) of homosexuality. There's a good film about this called the Imitiation Game - go check it out!

Meanwhile, Gödel was continuing to wreak mathematical havoc. He continued his work on unprovable statements including a major contribution towards the incompleteness of set theory. Other stuff. It seemed that his interests moved away from computer science - despite helping kick off the whole field. But in the late 1980s, a letter he had written to polymath John Von Neumman in 1956 was discovered to contain a question directly relating his formalist fears to the most important problem in complexity theory (which wasnt formally defined for another [15 years](https://en.wikipedia.org/wiki/P_versus_NP_problem#History)). So why was Hilbert's ghost haunting Gödel? 

The problem Gödel proposed was the following: given a mathematical statement $F$, can it be proven with less than $n$ symbols? Firstly, notice that this is a much weaker version of Hilbert's challenge which asked whether $F$ was true, regardless of the length of its proof. Nevertheless, there is clearly some algorithm for doing this so Gödel asks about the efficiency of an optimal algorithm for this. he [writes](https://www.anilada.com/notes/godel-letter.pdf):

> If there really were a machine with $\phi(n) \sim k n$ (or even $\sim k · n^2$), this would have consequences of the greatest importance. Namely, it would obviously mean that in spite of the undecidability of [Hilbert's challenge], the mental work of a mathematician concerning Yes-or-No questions could be completely replaced by a machine. After all, one would simply have to choose the natural number $n$ so large that when the machine does not deliver a result, it makes no sense to think more about the problem.

In other words (ignoring the symbols), Gödel observes that an *efficient* algorithm for finding proofs would render matematical creativity obselete! Here's a first attempt at solving this problem, given $F$ and $n$: generate *all* possible proofs of length up to $n$ and check whether any of them end by proving $F$. This is absolutely doable for a Turing machine. If you know what proofs look like in the predicate calculus, you could easily go away and write a program to list them all out and check whether they have your answer. Then simply plug in your favourite unsolved conjecture and make mathematical history!

If you're still here, you're presumably a little sceptical about why no-one else ever thought to try this. So what's the catch? Well turns out there's only one problem. Though the proposed algorithm works, it is extremely inefficient. For any interesting problem, it could easily take millions of years to go through all possible proofs. Clearly, finding the right answer is not enough. We also want it now! See why I called complexity theorists *impatient mathematicians*? 


### Medium


### Hard