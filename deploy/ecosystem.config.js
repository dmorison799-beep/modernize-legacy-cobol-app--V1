/**
 * PM2 Ecosystem Configuration
 * For non-Docker deployment using PM2 process manager.
 *
 * Usage:
 *   pm2 start ecosystem.config.js
 *   pm2 start ecosystem.config.js --env production
 */
module.exports = {
  apps: [{
    name: 'accounting',
    script: '../node-app/src/main.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '128M',
    env: {
      NODE_ENV: 'development',
      INITIAL_BALANCE: '1000.00'
    },
    env_production: {
      NODE_ENV: 'production',
      INITIAL_BALANCE: '1000.00'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    merge_logs: true
  }]
};
