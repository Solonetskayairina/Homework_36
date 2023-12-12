    const choice = {
        categories: document.querySelector('#jokesCategories'),
        jokes: document.querySelector('#jokesList')
    }

    const getFile = file => fetch(file)
        .then(data => data.ok ? data.json() : Promise.reject(data.statusText));

    getFile('https://api.chucknorris.io/jokes/categories')
        .then((data)=> {
            console.log(data);

            data.forEach((category) => {
                const option = document.createElement('option')
                option.value = category;
                option.text = category;
                choice.categories.appendChild(option);
            })
        })
        .catch(err => console.log(err))

    choice.categories.addEventListener('change', () => {
       const selectedCategory = choice.categories.value;

        getFile(`https://api.chucknorris.io/jokes/random?category=${selectedCategory}`)
            .then(data => {
                console.log(data);

                const listItem = document.createElement('li');

                const pCategory = document.createElement('p');
                pCategory.textContent = 'Category: ';

                const bCategory = document.createElement('b');
                bCategory.textContent = selectedCategory;

                const pJokeValue = document.createElement('p');
                pJokeValue.textContent = data.value;

                const button = document.createElement('button');
                button.textContent = 'Remove joke';

                button.addEventListener('click', () => {
                    listItem.remove();

                    choice.categories.querySelector(`option[value="${selectedCategory}"]`).disabled = false;
                })

                listItem.appendChild(pCategory);
                pCategory.appendChild(bCategory);
                listItem.appendChild(pJokeValue);
                listItem.appendChild(button);

                choice.jokes.appendChild(listItem);

                choice.categories.querySelector(`option[value="${selectedCategory}"]`).disabled = true;
            })
            .catch(err => console.log(err))
    })