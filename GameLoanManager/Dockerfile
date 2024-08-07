 #Use uma imagem base para a construção da aplicação
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
EXPOSE 5000

# Copie o arquivo de projeto e restaure as dependências
COPY . ./
RUN dotnet restore

RUN dotnet build -c Release -o /app/build

# Use uma imagem base para a execução da aplicação
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/build .
RUN ls -la /app
ENTRYPOINT ["dotnet", "GameLoanManager.dll"]