module.exports = function(grunt){
    //定义任务
    grunt.initConfig({
        watch: {
        	jade: {
        		files: ['views/**'],
        		options: {
        			//当文件出现改动 会重新启动服务
        			livereload: true
        		}
        	},
        	js: {
        		files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
        		// taks: ['jshint'], //语法检查 
        		options: {
        			livereload: true
        		}
        	}
        },
        nodemon: {
        	dev: {
        		options: {
        			file: 'app.js',
        			args: [],
        			ignoredFiles: ['README.md', 'node_moudles/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    // watchedFolders: ['app', 'config'],
                    watchedFolders: ['./'],//监听当前目录
                    debug: true,
                    delayTime: 1,
                    env: {
                    	PORT:3000
                    },
                    cwd: __dirname
        		}
        	}
        },
        concurrent: {
        	tasks: ['nodemon', 'watch'],
        	options: {
        		logConcurrentOutPut: true
        	}
        }
    })
   

	//每新增 修改文件 会重新执行...
   grunt.loadNpmTasks('grunt-contrib-watch')
   //实时监听 入口 文件
   grunt.loadNpmTasks('grunt-nodemon')
   //针对慢任务 开发的一个插件 能优化 编译的时间 同时能用来跑多个 阻塞的任务 eg:watch nodemon
   grunt.loadNpmTasks('grunt-concurrent')
   
   //该设置的目的是 便于在开发过程中 避免由于 语法错误,警告 而中断grunt的整个服务
   grunt.option('force',true)

   //注册一个默认的任务
   grunt.registerTask('default',['concurrent'])
}