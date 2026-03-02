import { garageService } from "../services/garage-service.js";
import { EngineStatus } from "../types/engine-status.enum.js";
import { garageController } from "./garage.controller.js";

export class CarController {
  private animationId: number | undefined = undefined;
  onFinishCallback?: (time: number) => Promise<void>;

  constructor(
    private carId: number,
    private carElement: HTMLElement,
    private roadElement: HTMLElement,
    private startButton: HTMLButtonElement,
    private resetButton: HTMLButtonElement,
    onFinishCallback: (time: number) => Promise<void>,
  ) {
    this.onFinishCallback = onFinishCallback;
  }

  private setBtnsStatus(driving: boolean): void {
    this.startButton.disabled = driving;
    this.startButton.classList.toggle("no-active", driving);

    this.resetButton.disabled = !driving;
    this.resetButton.classList.toggle("no-active", !driving);
  }

  async start(): Promise<void> {
    this.setBtnsStatus(true);
    const startResponse = await garageService.setEngineStatus(
      this.carId,
      EngineStatus.Started,
    );

    if (!startResponse || !("velocity" in startResponse)) {
      this.startButton.disabled = false;
      this.startButton.classList.remove("no-active");
      return;
    }

    const time = startResponse.distance / startResponse.velocity;

    this.startAnimation(time);

    const driveResponse = await garageService.setEngineStatus(
      this.carId,
      EngineStatus.Drive,
    );

    if (
      !driveResponse ||
      ("success" in driveResponse && !driveResponse.success)
    ) {
      this.stopAnimation();
    }
  }

  async reset(): Promise<void> {
    this.stopAnimation();
    garageController.isRaceStart = false;

    await garageService.setEngineStatus(this.carId, EngineStatus.Stopped);

    this.carElement.style.transform = "translateX(0)";

    this.setBtnsStatus(false);
  }

  private startAnimation(time: number): void {
    const maxDistance =
      this.roadElement.clientWidth - this.carElement.clientWidth;

    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / time, 1);
      this.carElement.style.transform = `translateX(${progress * maxDistance}px)`;

      if (progress < 1) {
        this.animationId = requestAnimationFrame(animate);
      } else {
        if (this.onFinishCallback) {
          void this.onFinishCallback(time);
        }
      }
    };

    this.animationId = requestAnimationFrame(animate);
  }

  private stopAnimation(): void {
    if (this.animationId !== undefined) {
      cancelAnimationFrame(this.animationId);
      this.animationId = undefined;
    }
  }
}
