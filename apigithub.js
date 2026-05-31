async function fetchGitHubProfile(username) {
      const cardContainer = document.getElementById('github-card');

      try {

       const response = await fetch(`https://api.github.com/users/${username}`);

       if (!response.ok) {
            throw new Error('Erro, usuário não encontrado');
       }

       const data = await response.json();

       cardContainer.innerHTML = `
            <div class="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg flex flex-col items-center text-center">
                 <img src="${data.avatar_url}" alt="${data.name}" class="w-24 h-24 rounded-full border-2 border-indigo-500 mb-4 shadow-md">
                 <h2 class="text-xl font-bold text-slate-100">${data.name || data.login}</h2>
                 <p class="text-sm text-indigo-400 mb-3">@${data.login}</p>
                 <p class="text-slate-300 text-sm mb-4">${data.bio || 'Sem bio disponível.'}</p>

                 <div class="flex gap-4 text-sm text-slate-400 mb-5">
                   <div><strong class="text-slate-200">${data.followers}</strong> seguidores</div>
                   <div><strong class="text-slate-200">${data.public_repos}</strong> repositórios</div>            
                 </div>

                 <a href="${data.html_url}" target="_blank" class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                        Ver perfil no GitHub
                 </a>
            </div>
      `;

      } catch (error) {
            cardContainer.innerHTML = `
                  <p class="text-red-400 text-sm font-medium">Erro: ${error.message}</p>
            `; 
      }
}

fetchGitHubProfile('willpc5');