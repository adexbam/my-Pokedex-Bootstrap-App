var $pokemonRepository = (function () {     //IIFE starts here

    var $repository = [];  // empty array
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; // URL for the pokemon API
  
      async function showDetails(item) {                              
        await $pokemonRepository.loadDetails(item).then(function () { 
        console.log(item); });
      }
  
      function addListItem(pokemon) {
        var $boxlist = $('.pokobox');
        var $newElement = $('<div></div>');
        var $newElementButton = $('<button></button>');
        var $newContent = $newElement.text('');
        var $newContentTwo = $newElementButton.text(pokemon.name);
       
        //add the modal title
        var $modalTitle = $('#exampleModalLabel');
        var $modalId = $('#modal_id'); 
        $modalTitle.text($modalId.text()); 
     

        //add the necessary classes
        $newElement.addClass('list-group');
        $newElementButton.addClass('list-group-item list-group-item-action');
        $newElementButton.attr('id', 'modal_id');
        $newElementButton.attr('type', 'button');
        $newElementButton.attr('data-toggle', 'modal');
        $newElementButton.attr('data-target', '#exampleModal');
        
        //append button to the list item
        $newElement.append($newContent);
        $newElementButton.append($newContentTwo);
        $boxlist.append($newElement);
        $newElement.append($newElementButton);

        $newElementButton.on('click', function (event) {
          showDetails(pokemon);
        });
      };
  
  
    function add(pokemon) {
      $repository.push(pokemon);
      }
    
      function getAll() {
        return $repository;
      }

      function loadList() {
        return $.get(apiUrl,{},function (data) {
          data.results.forEach(function (item) {
            var pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        })
      }
 
      function loadDetails(item) { 
        var url = item.detailsUrl; 
        return $.get(url,{},(function (data) { // Now we add the details to the item 
          item.imageUrl = data.sprites.front_default; 
          item.height = data.height; 
          item.types = Object.keys(data.types); 
        })) 
      }
  
      return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        };
  
  })();  //IIFE Ends here
  
  $pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    $pokemonRepository.getAll().forEach(function(pokemon){
      $pokemonRepository.addListItem(pokemon);
    });
  });
