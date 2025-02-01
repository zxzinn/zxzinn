name: Metrics
on:
  # Schedule daily updates
  schedule: [{cron: "0 0 * * *"}]
  # (optional) Run workflow manually
  workflow_dispatch:
  # (optional) Run workflow when pushing on master/main
  push: {branches: ["master", "main"]}
jobs:
  github-metrics:
    runs-on: ubuntu-latest
    environment: 
      name: production
    permissions:
      contents: write
    steps:
      - uses: lowlighter/metrics@latest
        with:
          # Your GitHub token
          token: ${{ secrets.METRICS_TOKEN }}
          
          # Options
          user: zxzinn
          template: classic
          base: header, activity, community, repositories, metadata
          config_timezone: Asia/Shanghai
          
          # Display
          config_display: regular
          config_padding: 0, 8 + 11%
          
          # Core
          plugin_core: yes
          plugin_core_trim: yes
          
          # Lines of code
          plugin_lines: yes
          plugin_lines_sections: repositories, history
          plugin_lines_repositories_limit: 4
          plugin_lines_history_limit: 1
          plugin_lines_delay: 30
          
          # Languages
          plugin_languages: yes
          plugin_languages_ignored: >-
            html, css, tex, less, dockerfile, makefile, qmake, lex, cmake, shell,
            gnuplot
          plugin_languages_sections: most-used
          plugin_languages_details: bytes-size, percentage
          plugin_languages_limit: 8
          plugin_languages_threshold: 0%
          
          # Achievements
          plugin_achievements: yes
          plugin_achievements_display: detailed
          plugin_achievements_threshold: C
          
          # Notable
          plugin_notable: yes
          plugin_notable_filter: stars:>50
          plugin_notable_repositories: yes
          
          # Topics
          plugin_topics: yes
          plugin_topics_sort: stars
          plugin_topics_mode: mastered
          plugin_topics_limit: 15
          
          # Isometric calendar
          plugin_isocalendar: yes
          plugin_isocalendar_duration: half-year
