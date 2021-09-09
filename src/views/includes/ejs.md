<% Controler de fluxo (if, for...) %>
<%= Imprime escapando caracteres %>
<%- Imprime sem escapar caracteres %>
<%# Comentario %>
<%- include('CAMINHO/ARQUIVO'); %>

<% if (algumacoisa) { %>
    <%= exibe alguma coisa %>
<% } else { %>
    <%- exibe outra coisa %>
<% } %>