# Script PowerShell pour vérifier les versions des technologies web

# Couleurs personnalisées
$colorGreen = [System.ConsoleColor]::Green
$colorYellow = [System.ConsoleColor]::Yellow
$colorRed = [System.ConsoleColor]::Red
$colorBlue = [System.ConsoleColor]::Blue
$colorDefault = [System.ConsoleColor]::White

# Fonction pour obtenir les dernières mises à jour de Netlify
function Get-NetlifyUpdates {
    try {
        $releases = Invoke-RestMethod -Uri "https://api.github.com/repos/netlify/netlify/releases" -ErrorAction Stop
        
        Write-Host "Dernières mises à jour de Netlify :" -ForegroundColor $colorBlue
        
        for ($i = 0; $i -lt [Math]::Min(3, $releases.Count); $i++) {
            $release = $releases[$i]
            Write-Host ("- " + $release.name) -ForegroundColor $colorYellow -NoNewline
            Write-Host (" (" + (Get-Date $release.published_at -Format "yyyy-MM-dd") + "): ") -ForegroundColor $colorGreen -NoNewline
            Write-Host ($release.body.Substring(0, [Math]::Min($release.body.Length, 200)) + "...") 
        }
    }
    catch {
        Write-Host "Impossible de récupérer les mises à jour de Netlify." -ForegroundColor $colorRed
    }
}

# Fonction pour vérifier les versions
function Get-ToolVersion {
    param([string]$Tool)

    $currentVersion = $null
    $latestVersion = $null

    switch ($Tool) {
        "nodejs" {
            $currentVersion = (node --version 2>$null)
            $latestVersion = (Invoke-RestMethod "https://nodejs.org/dist/index.json")[0].version
        }
        "npm" {
            $currentVersion = (npm --version 2>$null)
            $latestVersion = (npm view npm version)
        }
        "eleventy" {
            $currentVersion = (npx @11ty/eleventy --version 2>$null)
            $latestVersion = (npm view @11ty/eleventy version)
        }
        "nunjucks" {
            $currentVersion = ((npm list nunjucks) -match "nunjucks@" -replace ".*@", "")
            $latestVersion = (npm view nunjucks version)
        }
        "tailwindcss" {
            $currentVersion = ((npm list tailwindcss) -match "tailwindcss@" -replace ".*@", "")
            $latestVersion = (npm view tailwindcss version)
        }
        "storybook" {
            $currentVersion = (npx sb --version 2>$null)
            $latestVersion = (npm view @storybook/cli version)
        }
        "decap-cms" {
            $currentVersion = ((npm list decap-cms-app) -match "decap-cms-app@" -replace ".*@", "")
            $latestVersion = (npm view decap-cms-app version)
        }
        default {
            Write-Host "Outil non reconnu" -ForegroundColor $colorRed
            return $null
        }
    }

    return @{
        CurrentVersion = $currentVersion
        LatestVersion = $latestVersion
    }
}

# Fonction pour ouvrir la documentation
function Open-Documentation {
    param([string]$Tool)

    $docs = switch ($Tool) {
        "nodejs" { "https://nodejs.org/en/download/" }
        "npm" { "https://docs.npmjs.com/updating-npm" }
        "eleventy" { "https://www.11ty.dev/docs/upgrade/" }
        "nunjucks" { "https://mozilla.github.io/nunjucks/getting-started.html" }
        "tailwindcss" { "https://tailwindcss.com/blog/tailwindcss-v4-alpha" }
        "storybook" { "https://storybook.js.org/docs/migration/migration-guide" }
        "decap-cms" { "https://decapcms.org/docs/upgrading/" }
    }

    Write-Host "Documentation recommandée : $docs" -ForegroundColor $colorYellow
    $openDoc = Read-Host "Voulez-vous ouvrir la documentation dans votre navigateur par défaut ? (o/n)"
    
    if ($openDoc -eq "o" -or $openDoc -eq "O") {
        Start-Process $docs
    }
}

# Fonction pour mettre à jour un outil
function Update-Tool {
    param([string]$Tool)

    $updateCommand = switch ($Tool) {
        "nodejs" { 
            Write-Host "Veuillez utiliser nvm ou télécharger depuis nodejs.org" -ForegroundColor $colorRed
            return 
        }
        "npm" { "npm install -g npm@latest" }
        "eleventy" { "npm install @11ty/eleventy@latest --save-dev" }
        "nunjucks" { "npm install nunjucks@latest --save-dev" }
        "tailwindcss" { "npm install tailwindcss@latest postcss autoprefixer --save-dev" }
        "storybook" { "npx storybook@latest upgrade" }
        "decap-cms" { "npm install decap-cms-app@latest --save-dev" }
        default { 
            Write-Host "Mise à jour non prise en charge" -ForegroundColor $colorRed
            return 
        }
    }

    Write-Host "Commande de mise à jour : $updateCommand" -ForegroundColor $colorYellow
    $confirm = Read-Host "Voulez-vous procéder à la mise à jour ? (o/n)"
    
    if ($confirm -eq "o" -or $confirm -eq "O") {
        try {
            Invoke-Expression $updateCommand
            Write-Host "Mise à jour réussie !" -ForegroundColor $colorGreen
        }
        catch {
            Write-Host "Échec de la mise à jour." -ForegroundColor $colorRed
        }
    }
}

# Fonction principale
function Main {
    $tools = @("nodejs", "npm", "eleventy", "nunjucks", "tailwindcss", "storybook", "decap-cms")

    Write-Host "Vérification des versions de technologies web" -ForegroundColor $colorBlue

    foreach ($tool in $tools) {
        $versionInfo = Get-ToolVersion -Tool $tool

        if ($versionInfo) {
            Write-Host "`n$tool" -ForegroundColor $colorYellow
            Write-Host "Version actuelle : $($versionInfo.CurrentVersion)" -ForegroundColor $colorGreen
            Write-Host "Dernière version : $($versionInfo.LatestVersion)" -ForegroundColor $colorGreen

            if ($versionInfo.CurrentVersion -ne $versionInfo.LatestVersion) {
                Write-Host "Une nouvelle version est disponible !" -ForegroundColor $colorRed
                
                Open-Documentation -Tool $tool

                $updateCheck = Read-Host "Voulez-vous vérifier les détails de mise à jour ? (o/n)"
                if ($updateCheck -eq "o" -or $updateCheck -eq "O") {
                    Update-Tool -Tool $tool
                }
            }
            else {
                Write-Host "Vous êtes à jour." -ForegroundColor $colorGreen
            }
        }
    }

    # Section mises à jour Netlify
    Write-Host "`n====== Mises à jour Netlify ======" -ForegroundColor $colorBlue
    Get-NetlifyUpdates

    # Ressources Netlify supplémentaires
    Write-Host "`nRessources Netlify :" -ForegroundColor $colorYellow
    Write-Host "- Documentation : https://docs.netlify.com/"
    Write-Host "- Blog : https://www.netlify.com/blog/"
    Write-Host "- Changelog : https://github.com/netlify/netlify/releases"
}

# Exécuter la fonction principale
Main