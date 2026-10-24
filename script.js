    /*
      CATÁLOGO DE JOGOS                                                                                                                                                          
      Para adicionar um jogo:
      1. Copie um objeto do array.
      2. Cole abaixo do último jogo.
      3. Altere os dados.
      4. Separe os objetos com vírgula.

      Use informações verificadas e links oficiais/autorizados.
    */

    const games = [
      {
        id: "noturno-race",
        name: "Noturno Race",
        genre: "Corrida",
        platform: "Android",
        size: "Confira na página oficial",
        ads: "Confira no jogo",
        description:
          "Um jogo de corrida que vale conhecer. Acesse pelo link de convite do Felux e confira as informações oficiais.",
        featured: true,
        glyph: "N",
        color: "#77501c",
        glow: "#f6c84e",
        downloadUrl: "https://noturnorace.com/baixar/?ref=Felux",
        sourceName: "Acessar Noturno Race",
        image: "images/noturno-race.png"
      }
    ];

    const grid = document.querySelector("#game-grid");
    const searchInput = document.querySelector("#search");
    const count = document.querySelector("#count");
    const empty = document.querySelector("#empty");
    const filters = document.querySelector("#filters");
    const dialog = document.querySelector("#game-dialog");
    const dialogContent = document.querySelector("#dialog-content");

    let selectedPlatform = "Todos";

    function createCard(game) {
      const card = document.createElement("article");
      card.className = "game-card";

      const art = document.createElement("div");
      art.className = "game-art";
      if (game.image) {
          art.classList.add("has-image");
      }

      art.style.setProperty("--art-color", game.color);
      art.style.setProperty("--art-glow", game.glow);

      if (game.image) {
          const image = document.createElement("img");
          image.src = game.image;
          image.alt = `Logo de ${game.name}`;
          image.loading = "lazy";
          art.append(image);
      } else {
          const glyph = document.createElement("span");
          glyph.className = "game-glyph";
          glyph.textContent = game.glyph;
          art.append(glyph);
      }

      const tag = document.createElement("span");
      tag.className = "game-tag";
      tag.textContent = game.featured
        ? "Indicação do Felux"
        : game.genre;

      art.append(tag);

      const body = document.createElement("div");
      body.className = "game-body";

      const titleRow = document.createElement("div");
      titleRow.className = "game-title-row";

      const title = document.createElement("h3");
      title.textContent = game.name;

      const platform = document.createElement("span");
      platform.className = "platform";
      platform.textContent = game.platform;

      titleRow.append(title, platform);

      const description = document.createElement("p");
      description.className = "game-description";
      description.textContent = game.description;

      const meta = document.createElement("div");
      meta.className = "game-meta";

      [game.genre, game.ads].forEach(value => {
        const pill = document.createElement("span");
        pill.className = "meta";
        pill.textContent = value;
        meta.append(pill);
      });

      const footer = document.createElement("div");
      footer.className = "game-footer";

      const size = document.createElement("span");
      size.textContent = game.size;

const arrow = document.createElement("span");
      arrow.textContent = "↗";

      footer.append(size, arrow);
      body.append(titleRow, description, meta, footer);
      card.append(art, body);

      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "Ver detalhes de " + game.name);

      card.addEventListener("click", () => showDetails(game));

      card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          showDetails(game);
        }
      });

      return card;
    }

    function renderGames() {
      const query = searchInput.value.trim().toLocaleLowerCase("pt-BR");

      const visibleGames = games.filter(game => {        const matchesPlatform =                                                                                                                                                            selectedPlatform === "Todos" ||
          game.platform === selectedPlatform;

        const text = (
          game.name + " " +
          game.genre + " " +
          game.platform + " " +
          game.description
        ).toLocaleLowerCase("pt-BR");

        return matchesPlatform && text.includes(query);
      });

      grid.replaceChildren(...visibleGames.map(createCard));
      count.textContent =
        visibleGames.length +
        (visibleGames.length === 1 ? " jogo" : " jogos");

      empty.hidden = visibleGames.length > 0;
      grid.hidden = visibleGames.length === 0;
    }

    function showDetails(game) {
      dialogContent.replaceChildren();

      const art = document.createElement("div");
      art.className = "dialog-art";
      art.style.setProperty("--art-color", game.color);
      art.textContent = game.glyph;

      const title = document.createElement("h2");
      title.className = "dialog-title";
      title.textContent = game.name;

      const description = document.createElement("p");
      description.className = "dialog-description";
      description.textContent = game.description;

      const details = document.createElement("div");
      details.className = "details";

      [
        ["Plataforma", game.platform],
        ["Gênero", game.genre],
        ["Tamanho", game.size],
        ["Anúncios", game.ads]
      ].forEach(([label, value]) => {
        const item = document.createElement("div");
        item.className = "detail";

        const small = document.createElement("small");
        small.textContent = label;

        const strong = document.createElement("strong");
        strong.textContent = value;

        item.append(small, strong);
        details.append(item);
      });

      dialogContent.append(art, title, description, details);

      if (isWebUrl(game.downloadUrl)) {
        const link = document.createElement("a");
        link.className = "source-button";
        link.href = game.downloadUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = (game.sourceName || "Acessar fonte oficial") + " ↗";
        dialogContent.append(link);
      } else {
        const note = document.createElement("p");
        note.className = "dialog-note";
        note.textContent =
          "O link ainda será adicionado. Confira a fonte oficial antes de baixar.";
        dialogContent.append(note);
      }

      const note = document.createElement("p");
      note.className = "dialog-note";
      note.textContent =
        "Confira a compatibilidade e os requisitos antes de instalar.";
      dialogContent.append(note);

      dialog.showModal();
    }

    function isWebUrl(value) {
      try {
        const url = new URL(value);
        return url.protocol === "https:" || url.protocol === "http:";
      } catch {
        return false;
      }
    }

    searchInput.addEventListener("input", renderGames);

    filters.addEventListener("click", event => {
      const button = event.target.closest("[data-platform]");
      if (!button) return;

      selectedPlatform = button.dataset.platform;

      filters.querySelectorAll(".filter").forEach(filter => {
        filter.classList.toggle("active", filter === button);
      });

      renderGames();
    });

    document.querySelector("#close-dialog").addEventListener("click", () => {
      dialog.close();
    });

    dialog.addEventListener("click", event => {
      if (event.target === dialog) dialog.close();
    });

    document.querySelector("#copy-code").addEventListener("click", async () => {      const feedback = document.querySelector("#copy-feedback");

      try {
        await navigator.clipboard.writeText("FELUX");
        feedback.textContent = "Código FELUX copiado!";
      } catch {
        feedback.textContent = "Seu código é FELUX — copie manualmente.";
      }
    });

    document.querySelector("#year").textContent = new Date().getFullYear();

    renderGames();
