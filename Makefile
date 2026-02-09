
.PHONY: serve stop activate deactivate

serve:
	mkdocs serve --livereload

stop:
	@pids=$$(lsof -ti tcp:8000); \
	if [ -n "$$pids" ]; then \
		kill $$pids; \
		echo "Stopped process(es) on localhost:8000: $$pids"; \
	else \
		echo "No process running on localhost:8000"; \
	fi

activate:
	@echo "Run this in your shell: source venv/bin/activate"

deactivate:
	@echo "Run this in your shell: deactivate"
